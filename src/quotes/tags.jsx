import React from 'react';
import ApiResponse from '../common/apiResponse';

function Tags({tags}){
    if(tags){
    if (tags.hasOwnProperty("message")){
        return (
            <ApiResponse response={tags}/>
        );
    }
    else{
        return (
            <div className="flex flex-wrap space-between">
            {
                tags.map(
                    (tag) =>
                    (
                        <div className="tag-box" key={tag.tagid}>{tag.tagname}</div>
                    )
    
                )
            }
            </div>
        );
    }
    }
    return null;
        
}

export default Tags;