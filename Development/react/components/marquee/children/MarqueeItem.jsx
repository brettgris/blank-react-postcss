import React from 'react';

const MarqueeItem = ({data}) => {
	return (
		<div className="item center">
			{data.name}
		</div>
	)
}

export default MarqueeItem;