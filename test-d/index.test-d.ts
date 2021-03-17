import { expectType } from "tsd";
import { MicroCMSRequestFields } from '../src/index';

type ValidFields = MicroCMSRequestFields<'title,main', { title: 'hoge', main: 'hoge' }>
type ValidFieldsThree = MicroCMSRequestFields<'title,main,updatedAt', { title: 'hoge', main: 'hoge', updatedAt: 'hoge' }>
type ValidFieldsFour = MicroCMSRequestFields<'title,author,main,updatedAt', { title: 'hoge', main: 'hoge', updatedAt: 'hoge', author: 'meijin' }>
type ValidFieldsFive = MicroCMSRequestFields<'title,author,main,published,updatedAt', { title: 'hoge', main: 'hoge', updatedAt: 'hoge', author: 'meijin', published: false }>
type ValidFieldsPartial = MicroCMSRequestFields<'title', { title: 'hoge', main: 'hoge' }>
type ValidFieldsPartial2 = MicroCMSRequestFields<'main', { title: 'hoge', main: 'hoge' }>

type ValidFieldsDot = MicroCMSRequestFields<'title,main,author.name', { title: 'hoge', main: 'hoge', author: { name: 'name', test: 'test' } }>
type ValidFieldsDot2 = MicroCMSRequestFields<'title,author.test,main,author.name', { title: 'hoge', main: 'hoge', author: { name: 'name', address: { pref: 'tokyo' }, test: 'test' } }>
type ValidFieldsDotInvalid = MicroCMSRequestFields<'title,author.test,main,author.never', { title: 'hoge', main: 'hoge', author: { name: 'name', test: 'test' } }>

// TODO: Object has nested props over 3 can't be typed
type ValidFieldsDot3ToDo = MicroCMSRequestFields<'title,author.test,author.address.pref,main,author.name', { title: 'hoge', main: 'hoge', author: { name: 'name', address: { pref: 'tokyo' }, test: 'test' } }>

type InvalidFields = MicroCMSRequestFields<'title,main', { title: 'hoge', _main: 'hoge' }>
type InvalidFields2 = MicroCMSRequestFields<'title,main,never', { title: 'hoge', main: 'hoge' }>
type InvalidFields3 = MicroCMSRequestFields<'never,title,main', { title: 'hoge', main: 'hoge' }>

expectType<ValidFields>('title,main')
expectType<ValidFieldsThree>('title,main,updatedAt')
expectType<ValidFieldsFour>('title,author,main,updatedAt')
expectType<ValidFieldsFive>('title,author,main,published,updatedAt')
expectType<ValidFieldsPartial>('title')
expectType<ValidFieldsPartial2>('main')
expectType<ValidFieldsDot>('title,main,author.name')
expectType<ValidFieldsDot2>('title,author.test,main,author.name')

expectType<() => ValidFieldsDot3ToDo>(() => { throw new Error })

expectType<() => ValidFieldsDotInvalid>(() => {throw new Error})
expectType<() => InvalidFields>(() => {throw new Error})
expectType<() => InvalidFields2>(() => {throw new Error})
expectType<() => InvalidFields3>(() => {throw new Error})