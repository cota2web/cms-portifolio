export const configApp = {
    app: {
        urlBase: 'http://192.168.0.200',
        port: '3000'
    },
    api: {
        urlBase: 'http://192.168.0.200:3001'//'https://a998-186-209-185-30.ngrok-free.app'
    },
    routes: {
        categorias: '/categorias',
        categoriaDefault: '/categorias/default/find',
        posts: '/posts',
        postsPorCategoria: '/posts/findAllPostsFromCategoria',
        postUploadArquivo: '/posts/upload/arquivo',
        postGetImage: '/posts/image'
    }
}