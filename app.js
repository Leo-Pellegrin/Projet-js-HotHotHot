function main () {
    const permission = document.getElementById('push-Notifications')
    if (!permission || (!Notification in window)) {
        return;
    }
    const button = document.createElement('button')
    button.innerText = 'Recevoir les notifications'
    permission.appendChild(button)
    button.addEventListener('click', askNotificationsPermission)


}

async function askNotificationsPermission () {
    // fonction qui sert à demanderla permission
    const permission = await Notification.requestPermission()
    if (permission == 'granted') {
        registerServiceWorker()
    }
}

async function registerServiceWorker() {
    
}


main()