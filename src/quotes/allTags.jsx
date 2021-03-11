import React from 'react';
import Tags from './tags';

const AllTags = ({allTags}) => (
    <div>
    <h3>Your Tags</h3>
    <Tags tags={allTags}/>
    </div>

);

export default AllTags;