import { MicroCMSRequestFields } from 'type-safe-microcms-query';

const field: MicroCMSRequestFields<'index', { index: 'name' }> = 'index'
console.log(field)