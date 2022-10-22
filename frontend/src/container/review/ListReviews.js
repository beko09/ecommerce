import React from 'react';
import Rating from "./Rating";
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import 'moment/locale/ar';
import "./reviews.css";


moment.locale('ar');

const ListReviews = ({ reviews }) => {
    return (
        <div className="reviews">
            <div className="container">
                <div className="content">
                    <h3>المراجعات</h3>
            {reviews && reviews.map(review => (
            <Comment
                    key={review._id}
                actions={null}
                author={<span>{review.name}</span>}
                avatar={
                    <Avatar
                        src=''
                        alt={review.name}
                    />
                }
                content={
                    <div>
                         <Rating
                        value={review.rating}
                        disabled={true}
                        />
                        <p>
                            {review.comment}
                        </p>
                    </div>
                  
                }
                datetime={
                    <Tooltip title={moment(review.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(review.createdAt).fromNow()}</span>
                    </Tooltip>
                }
            />
            
            ))}
                </div>
            </div>
        </div>
    )
}

export default ListReviews
