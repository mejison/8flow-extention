<template>
    <div class="scrap">
        <button class="btn btn-primary" @click.prevent="onClickScrap">Scrap</button>
        scraped:
    </div>
</template>

<script>
export default  {
    data() {
        return {
            
        }
    },
    created() {

        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            const fields = JSON.parse(message.data);
            console.log(fields)
            response(true); 
        });

    },
    methods: {
        onClickScrap() {
           chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const activeTab = tabs.shift();
                chrome.tabs.sendMessage(activeTab.id, {"event": "scraping"});
            });
        },
    }
}
</script>