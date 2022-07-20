// const checkAvailableForScraping = () => {
//     const allowedHosts = ['service-now.com'];
//     let allow = false;
//     allowedHosts.forEach((host) => {
//         allow = document.location.host.includes(host)
//     });
    
//     if ( ! allow) {
//         return ;
//     }

//     return window.gsft_main && ['incident'].includes(window.gsft_main.g_form.tableName)
// }

let insertedScript = false;

window.scraping = () => {
    if ( ! insertedScript) {
        insertedScript = document.createElement('script');
        insertedScript.src = chrome.runtime.getURL('script.js');
        (document.head || document.documentElement).appendChild(insertedScript);
        insertedScript.onload = function() {
            insertedScript.remove();
            document.dispatchEvent(
                new CustomEvent('scraping')
            );
        };
    }
    
    document.dispatchEvent(
        new CustomEvent('scraping')
    );
}

chrome.runtime.onMessage.addListener(
    (request, sender, response) => {
        let event = request.event
        window[event]();
        response();
    }
);

document.addEventListener('scraped', function(e) {
    console.log(e.detail)
   
    chrome.runtime.sendMessage({
        data: e.detail
    });
});