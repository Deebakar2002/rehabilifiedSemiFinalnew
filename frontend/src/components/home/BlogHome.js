import React from 'react'; 
import Slider from 'react-slick';
import './BlogHome.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Example blog posts data
const blogPosts = [
    {
        id: 1,
        title: "First Blog Post",
        author: "John Doe",
        date: "October 10, 2023",
        summary: "This is a summary of the first blog post.",
        image: "images/home/bloghome.jpg"
    },
    {
        id: 2,
        title: "Second Blog Post",
        author: "Jane Smith",
        date: "October 12, 2023",
        summary: "This is a summary of the second blog post.",
        image: "images/home/bloghome.jpg"
    },
    {
        id: 3,
        title: "Third Blog Post",
        author: "Michael Johnson",
        date: "October 14, 2023",
        summary: "This is a summary of the third blog post.",
        image: "images/home/bloghome.jpg"
    },
    {
        id: 4,
        title: "Fourth Blog Post",
        author: "Emily Davis",
        date: "October 16, 2023",
        summary: "This is a summary of the fourth blog post.",
        image: "images/home/bloghome.jpg"
    },
];

// Slider settings
const settings = {
    dots: true,  
    infinite: false,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

// Custom Next Arrow component
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} blog-home-custom-arrow`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

// Custom Prev Arrow component
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} blog-home-custom-arrow`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

const BlogHome = () => {
    return (
        <div className="blog-home">
            <h1 className="blog-home-animate-title">Welcome to the Blog</h1>
            <p className="blog-home-animate-text">Check out our latest articles below:</p>
            
            <Slider {...settings} className="blog-home-slider">
                {blogPosts.map(post => (
                    <div className="slick-slide" key={post.id}>
                        <div className="blog-home-post">
                            <div className="blog-home-post-content">
                                <img src={post.image} alt={post.title} className="blog-home-image" />
                                <h2>{post.title}</h2>
                                <p><strong>By:</strong> {post.author}</p>
                                <p><strong>Date:</strong> {post.date}</p>
                                <p>{post.summary}</p>
                                <button className="blog-home-read-more">Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default BlogHome;