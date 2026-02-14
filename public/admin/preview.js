CMS.registerPreviewStyle("/admin/preview.css");

var PostPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var getAsset = this.props.getAsset;
        var widgetFor = this.props.widgetFor;

        var title = entry.getIn(['data', 'title']);
        var date = entry.getIn(['data', 'pubDate']);
        var author = entry.getIn(['data', 'author']) || 'Cheito Díaz';
        var image = entry.getIn(['data', 'image']);
        var description = entry.getIn(['data', 'description']);
        var body = widgetFor('body');

        // Resolve image asset
        var imageAsset = image ? getAsset(image) : null;
        var imageSrc = imageAsset ? imageAsset.toString() : '';

        return h('div', { className: 'preview-container' },
            h('header', { className: 'preview-header' },
                h('div', { className: 'preview-date' },
                    date ? new Date(date).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ''
                ),
                h('h1', { className: 'preview-title' }, title),
                h('div', { className: 'preview-author-box' },
                    h('div', { className: 'preview-author-avatar' },
                        h('img', { src: '/cheito-author.jpg' })
                    ),
                    h('span', { className: 'preview-author-name' }, 'Por ' + author)
                )
            ),
            imageSrc ? h('div', { className: 'preview-hero-wrapper' },
                h('img', { src: imageSrc, className: 'preview-hero-image' })
            ) : null,
            h('div', { className: 'preview-lead' },
                description
            ),
            h('div', { className: 'prose' },
                body
            )
        );
    }
});

CMS.registerPreviewTemplate("posts", PostPreview);
