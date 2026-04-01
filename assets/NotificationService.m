// #import <UserNotifications/UserNotifications.h>

// @interface NotificationService : UNNotificationServiceExtension
// @property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
// @property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;
// @end

// @implementation NotificationService

// - (void)didReceiveNotificationRequest:(UNNotificationRequest *)request
//                    withContentHandler:(void (^)(UNNotificationContent *_Nonnull))contentHandler {
//   self.contentHandler = contentHandler;
//   self.bestAttemptContent = [request.content mutableCopy];

//   // ✅ Read "image" key from your notification data payload
//   NSString *imageURL = request.content.userInfo[@"image"];

//   if (imageURL) {
//     NSURL *url = [NSURL URLWithString:imageURL];
//     NSURLSessionDownloadTask *task = [[NSURLSession sharedSession]
//       downloadTaskWithURL:url
//         completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
//           if (location) {
//             NSString *tmpFile = [NSTemporaryDirectory()
//               stringByAppendingPathComponent:[url.lastPathComponent
//                 stringByAppendingString:@".png"]];
//             NSURL *tmpURL = [NSURL fileURLWithPath:tmpFile];
//             [[NSFileManager defaultManager] moveItemAtURL:location toURL:tmpURL error:nil];

//             UNNotificationAttachment *attachment =
//               [UNNotificationAttachment attachmentWithIdentifier:@""
//                                                             URL:tmpURL
//                                                         options:nil
//                                                           error:nil];
//             if (attachment) {
//               self.bestAttemptContent.attachments = @[attachment];
//             }
//           }
//           self.contentHandler(self.bestAttemptContent);
//         }];
//     [task resume];
//   } else {
//     self.contentHandler(self.bestAttemptContent);
//   }
// }

// - (void)serviceExtensionTimeWillExpire {
//   self.contentHandler(self.bestAttemptContent);
// }

// @end

#import <UserNotifications/UserNotifications.h>

@interface NotificationService : UNNotificationServiceExtension
@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;
@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request
                   withContentHandler:(void (^)(UNNotificationContent *_Nonnull))contentHandler {
  self.contentHandler = contentHandler;
  self.bestAttemptContent = [request.content mutableCopy];

  NSString *imageURL = nil;

  // ✅ 1. Check "body" key — confirmed location from your APNs log
  NSDictionary *body = request.content.userInfo[@"body"];
  if ([body isKindOfClass:[NSDictionary class]]) {
    imageURL = body[@"image"];
  }

  // 2. Fallback: check "data" key
  if (!imageURL) {
    NSDictionary *data = request.content.userInfo[@"data"];
    if ([data isKindOfClass:[NSDictionary class]]) {
      imageURL = data[@"image"];
    }
  }

  // 3. Fallback: root level
  if (!imageURL) {
    imageURL = request.content.userInfo[@"image"];
  }

  // 4. Fallback: dataString (Expo sometimes encodes as JSON string)
  if (!imageURL) {
    NSString *dataString = request.content.userInfo[@"dataString"];
    if (dataString) {
      NSData *jsonData = [dataString dataUsingEncoding:NSUTF8StringEncoding];
      NSDictionary *parsed = [NSJSONSerialization JSONObjectWithData:jsonData
                                                             options:0
                                                               error:nil];
      imageURL = parsed[@"image"];
    }
  }

  if (imageURL) {
    NSURL *url = [NSURL URLWithString:imageURL];
    NSURLSessionDownloadTask *task = [[NSURLSession sharedSession]
      downloadTaskWithURL:url
        completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
          if (location) {
            NSString *tmpFile = [NSTemporaryDirectory()
              stringByAppendingPathComponent:[url.lastPathComponent
                stringByAppendingString:@".png"]];
            NSURL *tmpURL = [NSURL fileURLWithPath:tmpFile];
            [[NSFileManager defaultManager] moveItemAtURL:location
                                                    toURL:tmpURL
                                                    error:nil];
            UNNotificationAttachment *attachment =
              [UNNotificationAttachment attachmentWithIdentifier:@""
                                                            URL:tmpURL
                                                        options:nil
                                                          error:nil];
            if (attachment) {
              self.bestAttemptContent.attachments = @[attachment];
            }
          }
          self.contentHandler(self.bestAttemptContent);
        }];
    [task resume];
  } else {
    self.contentHandler(self.bestAttemptContent);
  }
}

- (void)serviceExtensionTimeWillExpire {
  self.contentHandler(self.bestAttemptContent);
}

@end