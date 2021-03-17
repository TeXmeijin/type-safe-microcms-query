type _Object = { [x: string]: any }

type Values<T extends _Object> = T[keyof T]

type AccessKeyUsingDot<Str extends string, T extends _Object> = `${Str}.${string & keyof T}`

type PickObjectProps<T extends _Object> = Values<{
    [k in string & keyof T]: AccessKeyUsingDot<k, T[k]>
}>

type AccessKeys<T extends _Object> = (string & keyof T) | PickObjectProps<T>

export type MicroCMSRequestFields<Str extends string, Response extends _Object> = 
    Str extends `${AccessKeys<Response>}` ? Str :
    Str extends `${AccessKeys<Response>},${AccessKeys<Response>}` ? Str :
    Str extends `${infer Str2},${AccessKeys<Response>}` ? Str2 extends MicroCMSRequestFields<Str2, Response> ? Str : never : never