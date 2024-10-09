import React from 'react';

export const PackagesSlide = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" style={{ height: "70%" , width: '50%', margin: '20px auto', borderRadius: '15px', overflow: 'hidden' }}>

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>


            <div className="carousel-inner">

                <div className="carousel-item active">
                    <img src="https://media.istockphoto.com/id/1457972072/photo/scenic-view-of-worlds-highest-waterfall-angel-fall-in-venezuela.jpg?s=612x612&w=0&k=20&c=PJsr6zejx-jztAqlXvQ5T_SlgTuvd2tUn7JU7WEIZvk=" className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>


                <div className="carousel-item">
                    <img src="https://media.istockphoto.com/id/1457972072/photo/scenic-view-of-worlds-highest-waterfall-angel-fall-in-venezuela.jpg?s=612x612&w=0&k=20&c=PJsr6zejx-jztAqlXvQ5T_SlgTuvd2tUn7JU7WEIZvk=" className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="https://media.istockphoto.com/id/1442179368/es/foto/isla-de-maldivas.jpg?s=612x612&w=0&k=20&c=XQ31ABgGDmCN8kjgYwHNI9Orkv7xpon7OIQ_Z-ie-nU=" className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>

            </div>


            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>


        </div>
    );

}