import React from 'react';

function Tags({tags}){
    if (tags !== undefined){
        return (
            tags.map(
                (tag) =>
                (
                    <div key={tag.tagid}>{tag.tagname}</div>
                )

            )
        );
    }
    else{
        return (
            <h3>Add some tags</h3>
        );
    }
        
}

export default Tags;