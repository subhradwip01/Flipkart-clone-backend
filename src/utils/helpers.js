export const createCategoryList = (categories,parentId = null) => {

    const categoryList = [];
    let filterdCat;
    if(parentId === null ) {
        filterdCat = categories.filter(cat=>categories.parentId == undefined);
    }else{
        filterdCat = categories.filter(cat=>cat.parentId == parentId);
    }

    for ( let cat of filterdCat){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            children: createCategoryList(categories,cat._id)
        })
    }

    return categoryList;
}