import React from 'react';

const Rows = ({ rowTitle, mediaList }) => {
    return (
        <div className="rowsContainer">
            <div className="rowsTitle">{rowTitle}</div>
            <div className="rowsImages">
                {mediaList.map(media => {
                    const background = { backgroundImage: `url(${media.imageUrl})`, backgroundPosition: "center center" }
                    return (
                        <button className="rowsImage" key={media.id} style={background}></button>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Rows;
