export interface IUnidadeDeNegocio {
    id: 'bee7fc4c-418e-4673-8197-56d8a2c187ed';
    descricao?: 'Portifólio Hugo Meirelles';

}

export interface ICategoria {
    id?: string;
    descricao?: string;
    undadeDeNegocio?: IUnidadeDeNegocio;
    home?: boolean;
    publicar?: boolean;
    slug?: string;
    layout?: string;
}

export interface IPost{
    id?: string;
    title?: string;  
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    categoriaId?: ICategoria['id'];
    imageUrl?: string;
    tipo?: 'page'|'post'|'produto';
    link?: string;
}