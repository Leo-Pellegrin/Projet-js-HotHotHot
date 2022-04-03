VapidDetails vapidKeys = VapidHelper.GenerateVapidKeys();
 
Console.WriteLine($"clé publique {vapidKeys.PublicKey}, clé privée :{vapidKeys.PrivateKey}");

async function subscribe() {
    if (Notification.permission !== "granted")
        if (await Notification.requestPermission() === "denied") {
            console.warn("L'utilisateur n'a pas autorisé les notifications");
            return null;
        }
        const serviceWorker = await navigator.serviceWorker.ready;
        const subscription = await serviceWorker.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(window.publicKey) });
        let keys = subscription.toJSON().keys;
    await fetch('/api/Subscription/Subscribe', {
    method: "POST",
    body: JSON.stringify({
        endpoint: subscription.endpoint,
        auth: keys.auth,
        p256dh: keys.p256dh,
    })
    });
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')
            ;
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }
}
navigator.serviceWorker.register('sw.js');

function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}

publicself.addEventListener("push", function (event: PushEvent) {
        const pushData = event.data.json();
        event.waitUntil(
            self.registration.showNotification("Test", {
                body: pushData.Summary,
                dir: "ltr",
                tag: "lesdieuxducode",
                icon: "/images/logo.png",
                badge: "/images/logo.png",
                image: pushData.TitleImage,
                data: pushData
            })
        );
    });

    public async Task SendWebPush(string endpoint, string p256dh, string auth, Article blogPost)
    {
        var subscription = new PushSubscription(endpoint, p256dh, auth);
        var vapidDetails = new VapidDetails("mail@mail.com", PublicKey, PrivateKey);
        var webPushClient = new WebPushClient();
        var payload = JsonConvert.SerializeObject(blogPost);
        try
        {
            await webPushClient.SendNotificationAsync(subscription, payload, vapidDetails);
        }
        catch (WebPushException exception)
        {
            if (exception.StatusCode == System.Net.HttpStatusCode.Gone)
                await DeleteSubscription(endpoint, p256dh, auth);
        }
    }