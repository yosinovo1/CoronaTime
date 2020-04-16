export const SELECT_CATEGORY = 'SELECT CATEGORY';
export const SWITCH_CONTENT = 'SWITCH CONTENT';

export const selectCategory = category => ({     
        type: SELECT_CATEGORY,
        payload: category
    });

export const switchContent = contentId => ({
    type: SWITCH_CONTENT,
    payload: contentId
})