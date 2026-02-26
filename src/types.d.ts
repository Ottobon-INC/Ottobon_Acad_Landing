declare module '@slorber/react-helmet-async' {
    import * as React from 'react';

    export interface HelmetTags {
        baseTag: Array<any>;
        linkTags: Array<HTMLLinkElement>;
        metaTags: Array<HTMLMetaElement>;
        noscriptTags: Array<any>;
        scriptTags: Array<HTMLScriptElement>;
        styleTags: Array<HTMLStyleElement>;
    }

    export interface HelmetProps {
        async?: boolean;
        base?: any;
        bodyAttributes?: any;
        defaultTitle?: string;
        defer?: boolean;
        encodeSpecialCharacters?: boolean;
        helmetData?: any;
        htmlAttributes?: any;
        onChangeClientState?: (newState: any, addedTags: HelmetTags, removedTags: HelmetTags) => void;
        link?: any[];
        meta?: any[];
        noscript?: Array<any>;
        script?: Array<any>;
        style?: Array<any>;
        title?: string;
        titleAttributes?: Object;
        titleTemplate?: string;
        prioritizeSeoTags?: boolean;
    }

    export class Helmet extends React.Component<React.PropsWithChildren<HelmetProps>> { }

    export class HelmetProvider extends React.Component<React.PropsWithChildren<{ context?: {} }>> {
        static canUseDOM: boolean;
    }
}
