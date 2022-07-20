document.addEventListener('scraping', function(e) {
    document.dispatchEvent(
        new CustomEvent('scraped', {
            detail: JSON.stringify(getForm(gsft_main.g_form))
        })
    );
});

String.prototype.ucfirst = function() {
    var str = this;
    if(str.length) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
};
    
function getForm(form) {
    return form.elements.map((el) => {
        const target = el.fetchedNodes[`incident.${el.fieldName}`]
        const func = 'getValue' + target.tagName.toLowerCase().ucfirst();
        return {
            name: el.fieldName,
            type: el.type,
            value: window[func](target)
        }
    });
}

function getValueInput(el) {
    return el.value;
}

function getValueTextarea(el) {
    return el.value;
}

function getValueSelect(el) {
    return el && el.selectedIndex ? el.options[el.selectedIndex].text : '';
}