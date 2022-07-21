<template>
    <div class="scrap" >
        <button 
            class="btn btn-primary" 
            :class="{'disabled': disabled}" 
            :disabled="disabled" 
            @click.prevent="onClickScrap"
        >Scrap</button>
        <ul class="variables" v-if="variables && variables.length">
            <li class="variable" v-for="(variable, index) in variables" :key="index">
               <div>
                 {{ variable }}
               </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            disabled: true,
        }
    },
    mounted() {
        this.checkAvailableForScraping();
        let $this = this;
        chrome.runtime.onMessage.addListener(function (message, sender, response) {
            $this[message.event](message.data);
            response(true); 
        });
    },
    computed: {
        ...mapGetters(['variables']),
    },
    methods: {
        ...mapActions(['setVariables']),
        isAvailable(value) {
            this.disabled = ! value;
        },
        checkAvailableForScraping() {
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const activeTab = tabs.shift();
                chrome.tabs.sendMessage(activeTab.id, {"event": "is-available"});
            });
        },
        getVariables(data) {
            const variables = JSON.parse(data);
            this.copyToClipBoard(data);
            this.setVariables([...variables])
        },
        copyToClipBoard(str) {
           const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
        onClickScrap() {
           chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                const activeTab = tabs.shift();
                chrome.tabs.sendMessage(activeTab.id, {"event": "scraping"});
            });
        },
    }
}
</script>

<style>
    .scrap {
        width: 100%;
        height: 100%;
    }

    .variables {
        padding: 0;
        margin: 0;
    }

    .variables .variable {
        align-items: center;
        white-space: nowrap;
        display: grid;
        grid-template-columns: auto;
    }

    .variable div {
        margin-bottom: 4px;
        font-size: 10px;
        padding: 0 4px 0 8px;
        border-radius: 8px;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 28px;
        display: grid;
        max-width: 100%;
        color: #005A04;
        background: #D7FFCF;
        border: 1px dashed #06AA00;
        grid-template-columns: 1fr auto;
    }
</style>