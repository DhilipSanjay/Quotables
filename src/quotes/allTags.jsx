import React from 'react';
import Tags from './tags';

const AllTags = ({allTags}) => (
    <div className="w-full max-w-xs container my-10 mx-4 justify-self-center">
        <div className="main-text pb-4">Your Tags</div>
        <Tags tags={allTags}/>
    </div>

);

export default AllTags;