import React from 'react';
import {
  FaCodepen,
  FaHandHoldingHeart,
  FaPeopleCarry,
  FaRegCompass,
  FaRegHandshake,
} from 'react-icons/fa';
import { FcAdvance } from 'react-icons/fc';

export default function About() {
  return (
    <div className='w-100 m-0 p-md-4 p-sm-2'>
      <p className='h5'>
        <mark>Who we are</mark>
      </p>
      <h3 className='display-4 w-100'>
        Empowering the world to develop technology through collective knowledge.
      </h3>
      <br />
      <div>
        <i>
          <p className='display-6 w-100'>
            Our public platform serves 100 million people every month, making it one of the 50 most
            popular websites in the world.
          </p>
          <p className='display-6 w-100'>
            Our asynchronous knowledge management and collaboration offering Stackinflow for Teams,
            is transforming how people work.
          </p>
        </i>
      </div>
      <br />
      <div className='m-auto w-75' style={{ boxShadow: '0.1em 0.1em 0.2em 0.2em skyblue' }}>
        <div className='col-md-5 d-inline-block p-2'>
          <h6>
            Published in 2022, Stackinflow's public platform is used by nearly everyone who codes to
            learn, share their knowledge, collaborate, and build their careers.
          </h6>
          <br />
          <h6>
            Our products and tools help developers and technologists in life and at work. These
            products include Stackinflow for Teams, Stackinflow Share knowledge and solve questions.
          </h6>
        </div>
        <div className='col-md-5 d-inline-block p-2'>
          <h6>
            Whether it’s on Stackinflow or within Stackinflow for Teams, community is at the center
            of all that we do.
          </h6>
          <br />
          <h6>
            Stackinflow for Teams, our core SaaS collaboration product, is helping thousands of
            peoples around the world make the transition to remote work, address business continuity
            challenges, and undergo digital transformation.
          </h6>
        </div>
      </div>
      <br />
      <br />
      <div className='m-auto card-header'>
        <div className='text-center col-sm-12 p-3 display-6'> Our Core Values </div>
        <div className='justify-content-center w-100 d-md-flex'>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='text-center display-4 text-primary'>
              <FaHandHoldingHeart />
            </div>
            <br />
            <h5>Adopt a customer-first mindset</h5>
            <p>
              Authentically serve our customers by empowering, listening and collaborating with our
              fellow Stackers.
            </p>
          </div>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='display-4 text-primary text-center'>
              <FaRegHandshake />
            </div>
            <br />
            <h5>Be flexible and inclusive</h5>
            <p>
              We do our best work when a diverse group of people collaborate in an environment of
              respect and trust. Create space for different voices to be heard, and allow
              flexibility in how people work.
            </p>
          </div>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='display-4 text-primary text-center'>
              <FaRegCompass />
            </div>
            <br />
            <h5>Be transparent</h5>
            <p>
              Communicate openly and honestly, both inside and outside the company. Encourage
              transparency from others by being empathetic, reliable, and acting with integrity.
            </p>
          </div>
        </div>
        <div className='justify-content-center w-100 d-md-flex'>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='display-4 text-primary text-center'>
              <FaPeopleCarry />
            </div>
            <br />
            <h5>Empower people to deliver outstanding results</h5>
            <p>
              Give people space to get their job done, support them when they need it, and practice
              blameless accountability.
            </p>
          </div>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='display-4 text-primary text-center'>
              <FaCodepen />
            </div>
            <br />
            <h5>Keep community at our center</h5>
            <p>
              Community is at the heart of everything we do. Nurture healthy communities where
              everyone is encouraged to learn and give back.
            </p>
          </div>
          <div className='col-sm-11 col-md-4 col-lg-4 d-inline-block p-2'>
            <div className='display-4 text-primary text-center'>
              <FcAdvance />
            </div>
            <br />
            <h5>Learn, share, grow</h5>
            <p>
              Adopt a Growth Mindset. Be curious and eager to learn. Aim for ethical, sustainable,
              long-term growth, both personally and in the company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
