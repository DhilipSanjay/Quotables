import React from 'react';
import Tags from './tags';

const AllTags = ({allTags}) => (
    <div>
    <div className="main-text">Your Tags</div>
    <Tags tags={allTags}/>
    </div>

);

export default AllTags;