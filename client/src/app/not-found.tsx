"use client"

export default function notFound() {
  return (
<div className="main-page">
<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
    {/* <!--    <link rel="stylesheet" href="index.css" /> */}
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
            // @ts-ignore
            crossorigin="anonymous"/>
    <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
            // @ts-ignore
            crossorigin="anonymous"
    ></script>

    <section className="page_404 stretch-full">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-10 col-sm-offset-1 text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center">404</h1>
                        </div>

                        <div className="contant_box_404">
                            <h3 className="h2">Look like you're lost</h3>

                            <p>the page you are looking for not avaible!</p>

                            <a href="/" className="link_404">Go to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
  )
}
