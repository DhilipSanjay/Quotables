import React from 'react';

function Tags({tags}){
    if (tags !== undefined){
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
    else{
        return (
            <div className="main-text">Add some tags!!</div>
        );
    }
        
}

export default Tags;