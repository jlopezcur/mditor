var vm = new Vue({
    el: '#editor',
    data: {
        input: '# Welcome to Mditor\nThe Markdown minimalistic editor.'
    },
    filters: {
        marked: marked
    }
})
