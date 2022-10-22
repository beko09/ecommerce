
<div id="top"></div>

<div align="center" id="about">

  <a href="#">
    <img src="preview_img/logo-tasawq.png" alt="Logo" />
   
  </a>
    <br/>
    <br/>
    <br/>
  <h1 align="center">متجر تسوق  (tasawq) </h1>

  <p align="center" style="line-height:30px; letter-spacing:1px;">
    I <strong>designed</strong> and <strong>programmed</strong> this project based on the university's requirements for electronic commerce, and I can't hide it, I had previous experience in the work of such projects.
  </p>
</div>
 <img src="preview_img/home-2.jpg" alt="Logo" />

<br/>
<br/>
<br/>

 :computer:  <a href="https://tasawq.herokuapp.com/"> Demo</a>
 :coffee:  <a href="https://www.facebook.com/abobakerhilal/">Abobaker Hilal</a>
 :link:  <a href="https://www.d-s.sd/"> d-s </a>

<br/>
<br/>

_________________
<br/>
<br/>

<!-- TABLE OF CONTENTS -->
<details >
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
    <a href="#arch">Project Architecting Files</a>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  
  </ol>
</details>
<br/>
<br/>

### Built With

The libraries I used to build the website.

* [Expressjs ▶️ Back-end](https://expressjs.com/)
* [Reactjs ▶️ Front-end](http://reactjs.org/)
* [Ant ▶️ Design](https://ant.design/)

# Getting Started

To run the project locally on your device You need to :arrow_down:

## Prerequisites

- download Npm.

  * npm

  ```sh
  npm install npm@latest -g
  ```
- download MongoDB Compass.

   - Follow this link
 <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass</a>

 - Import the database included in the project file database-exm
by running the following command inside MongoDB Compass terminal if you want that
    ```sh 
    mongorestore -d <database_name > <directory_backup>
   ```
- Or create database with name 'ecommerce' inside MongoDB Compass 

## Installation

Let's install the project locally and run it :running_man:.

1. First Clone the repo

   ```sh
   git clone https://github.com/beko09/ecommerce.git
   ```

2. Run Back-end first
Entering a folder backend

   ```sh
   cd backend
   ```
2. Install NPM packages

   ```sh
   npm install
   ```
    or
     ```sh
   yarn install
   ```
3. To run project as dev (see :sassy_man: package.json)

   ```sh
    npm run dev
    ```

4. Entering a folder backend :smile:

   ```sh
   cd frontend
   ```
2. Install NPM packages

   ```sh
   npm install
   ```
    or
     ```sh
   yarn install
   ```
3. To run project as dev (see :sassy_man: package.json)

   ```sh
    npm start
    ```


<br/>
<br/>

  [:arrow_up: Back to top](#top)
<br/>
<br/>

## :open_file_folder: <h1  id="arch">Project Architecting Files </h1>

```css
│   
├── Backend
│   ├── components
│   │    ├── categories
│   │    ├── config
│   │    ├── databaseConfig
│   │    ├── middleware
│   │    ├── orders
│   │    ├── payment
│   │    ├── products
│   │    ├── users
│   │    └── utils
│   │                 
│   ├── uploads
│   ├── package.json
│   └── server.js
│   
├── Frontend
│   ├── Public
│   ├── src
│   │    ├── components
│   │    ├── config
│   │    ├── container
│   │    ├── helpers
│   │    ├── pages
│   │    ├── redux
│   │    ├── res
│   │    ├── route
│   │    ├── utils
│   │    ├── App.js
│   │    └── index.js
│   │                 
│   └── package.json
│
├── preview_img
│
├── README.md
│
│

```


See :eyes: the [open issues](https://github.com/beko09/foodroad/issues) for a full list of proposed features (and known issues).
<br/>
<br/>
[:arrow_up: Back to top](#top)
<br/>
<br/>

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<br/>
<br/>

1. Fork the Project

2. Create your Feature Branch

```bash
    git checkout -b feature/AmazingFeature
```

3. Commit your Changes

```bash
    git commit -m 'Add some AmazingFeature'
```

4. Push to the Branch

```bash
    git push origin feature/AmazingFeature
```

5. Open a Pull Request

[:arrow_up: Back to top](#top)

# Contact

Abobaker hilal - [@facebook](https://www.facebook.com/abobakerhilal/)

Abobaker hilal - [@linkedin](https://www.linkedin.com/in/abobakerhilal/)

Blog: [d-s](https://www.d-s.sd)

[:arrow_up: Back to top](#top)
