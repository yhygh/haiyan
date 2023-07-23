import React from "react";
import { Link } from "react-router-dom";
import HaiyanHead from "../images/HaiyanYang.jpg";

const Home = () => {
  const skills = [
    "Node",
    "Express",
    "JWT",
    "MongoDB",
    "React",
    "React-redux",
    "Responsive Design",
    "JavaScript",
    "HTML",
    "CSS",
    "JSON",
    "Letsencrypt",
    "Bootstrap",
  ];

  return (
    <div>
      <h2>Welcome to Haiyan's Techland</h2>
      <div className="home-head">
        <img src={HaiyanHead} alt="Haiyan Head Shot" />
      </div>
      <div className="intro">
        <h4>To be a developer, not an executor.</h4>
        <p>
          Building a website is not as simple as it seems to be. Sure, there's
          no shortage of web development tutorials. However, how do you choose
          the right thing to learn and apply at work? It all comes down to one
          principle:
          <strong> DON’T IMITATE, UNDERSTAND.</strong> This is from my favorite
          web course instructor, <strong>Tony Alicea</strong>, the author of
          <strong>JavaScript: Understanding the Weird Parts</strong>. There's no
          other engineer like him out there that has impacted me so deeply.
        </p>

        <p>
          I have run into many sticky situations at work that were caused by
          misunderstanding of a library, a framework, or even the JavaScript
          language. Creating a working website and a website with good
          performance, security, scalability, and maintainability are two
          different things. A thriving team needs engineers who truly understand
          how each tech stack works. I always try to be one of those. I believe
          this effort is what makes me a real engineer, not a web framework
          executor.
        </p>

        <p>
          This is a responsive <strong>full stack website</strong> that is
          designed for my personal usage in 2020. From creating a favicon image,
          designing the look and feel, architecing the backend and frontend,
          implementing a sandwich bar for cell phone usage, to generating a SSL
          certificate and deployment, I did everything from scratch. I found a
          ton of fantastic
          <Link to="/techinfo"> web development resources</Link> including
          Youtube videos, Udemy courses, bloggers, and articles.{" "}
        </p>
        <p>
          {" "}
          I started by bookmarking these resources and then quickly realized
          that a bookmark feature cannot meet my needs. That's when I started to
          design and develop this website. Whenever I discover something
          valuable, I'd be able to add and categorize it to this website
          directly and also comment on it. Since it's mainly for my personal
          usage, some pages and functions are not visible to you, However, I'm
          sharing with you some of the most valuable resources. If you are also
          a web developer, I hope that you can benefit from my list. Swimming in
          the google ocean isn't really fun, because it takes a lot of time to
          sort out what's worth reading and learning and who is best at
          explaning technologies. I would also appreciate it if you could share
          with me your suggestions about this website or great resources you
          have found out under the
          <Link to="/suggestion"> Your Suggestions</Link> area. I will continue
          to work on it. Here is the{" "}
          <a href="https://github.com/yhygh/haiyan">source code</a>. Looking
          back, I'd like to rewrite this whole website if I had time. :)
          <strong> Thank you!</strong>
        </p>

        <div>
          The skills that I used to build this website in 2020 are as follows:
        </div>
        <ul>
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
