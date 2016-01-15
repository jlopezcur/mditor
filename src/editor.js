var vm = new Vue({
    el: 'body',
    data: {
        input: '# Welcome to Mditor\nThe Markdown minimalistic editor.',
        editor: null,
        showPreview: true,
        ver: '0.1.0',
        status: ''
    },
    ready: function () {
        // Setup the editor
        this.editor = ace.edit("editor");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/markdown");
        this.editor.getSession().setUseSoftTabs(false);
        this.editor.getSession().setUseWrapMode(false);
        this.editor.setHighlightActiveLine(true);
        this.editor.$blockScrolling = Infinity;

        // Initial content
        this.loadContent(this.input);

        // On editor 'change'
        this.editor.getSession().on('change', $.proxy(function(e) {
            this.input = this.editor.getValue();
        }, this));

        this.editor.on('changeSelection', $.proxy(function(e) {
            this.updateStatus();
        }, this));
        this.updateStatus();
    },
    filters: {
        marked: marked
    },
    methods: {
        undo: function () {
            this.editor.undo();
        },
        redo: function () {
            this.editor.redo();
        },
        addLink: function () {
            this.editor.insert('[text](http://)');
        },
        addImage: function () {
            this.editor.insert('![text](http://)');
        },
        setBold: function () {
            this.wrap('**', '**');
        },
        setItalic: function () {
            this.wrap('*', '*');
        },
        setHeader: function (n) {
            var tag = new Array(n+1).join('#') + ' ';
            this.prepend(tag);
        },
        setUnordererList: function () {
            this.prepend('* ');
        },
        setOrdererList: function () {
            this.prepend('1. ');
        },
        prepend: function (text) {
            var cursor = this.editor.getCursorPosition();
            this.editor.navigateLineStart();
            this.editor.insert(text);
            this.editor.moveCursorToPosition(cursor);
            this.editor.focus();
        },
        wrap: function (before, after) {
            var cursor = this.editor.getCursorPosition();
            var selection = this.editor.getSelectionRange();
            selection.end.column += before.length;
            this.editor.moveCursorToPosition(selection.start);
            this.editor.insert(before);
            this.editor.moveCursorToPosition(selection.end);
            this.editor.insert(after);
            this.editor.moveCursorToPosition(cursor);
            this.editor.focus();
        },
        togglePreview: function () {
            this.showPreview = !this.showPreview;
        },
        loadContent: function (text) {
            this.editor.setValue(text);
            this.editor.navigateFileStart();
            this.input = text;
            this.editor.focus();
        },
        saveContent: function () {
            return this.input;
        },
        updateStatus: function () {
            var cursor = this.editor.getCursorPosition();
            var fileDescription = (currentFileName != null ? currentFileName : 'Unkown');
            this.status = '<' + fileDescription + '> ' + cursor.row + ':' + cursor.column;
        }
    }
})

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
