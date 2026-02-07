CMS.registerPreviewTemplate("posts", createClass({
    render: function () {
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title']);
        const date = entry.getIn(['data', 'pubDate']);
        const author = entry.getIn(['data', 'author']) || 'Cheito Díaz';
        const image = entry.getIn(['data', 'image']);
        const description = entry.getIn(['data', 'description']);
        const body = this.props.widgetFor('body');

        // Create a simple emulation of the layout
        return h('div', {
            style: {
                padding: '20px',
                fontFamily: 'sans-serif',
                maxWidth: '800px',
                margin: '0 auto',
                color: '#333'
            }
        },
            h('header', { style: { marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' } },
                h('div', { style: { color: '#666', fontSize: '0.9rem', marginBottom: '10px' } },
                    date ? new Date(date).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ''
                ),
                h('h1', { style: { fontSize: '2.5rem', margin: '0 0 15px 0', color: '#111', lineHeight: '1.1' } }, title),
                h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                    h('div', { style: { width: '32px', height: '32px', borderRadius: '50%', background: '#eee', overflow: 'hidden' } },
                        h('img', { src: '/cheito-author.jpg', style: { width: '100%', height: '100%', objectFit: 'cover' } })
                    ),
                    h('span', { style: { fontWeight: 'bold', fontSize: '0.9rem' } }, 'Por ' + author)
                )
            ),
            image ? h('div', { style: { marginBottom: '30px', borderRadius: '8px', overflow: 'hidden', background: '#f0f0f0' } },
                h('img', { src: image, style: { width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' } })
            ) : null,
            h('div', { style: { fontSize: '1.5rem', lineHeight: '1.5', color: '#111', marginBottom: '30px', fontWeight: '600', textAlign: 'justify' } },
                description
            ),
            h('div', { className: 'prose', style: { fontSize: '1.125rem', lineHeight: '1.8', textAlign: 'justify' } },
                body
            )
        );
    }
}));
