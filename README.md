# Guru Guides
`HTML5` `CSS3` `JavaScript` `jQuery 4.3.1` `Ruby 2.3.3` `Rails 5.0.2` `Handlebars 4.0.6`

Guru Guides - A web application built to inspire adventure and engagement with new communities.

hosted on Heroku [here](heroku link will go here).

## Overview

Travelling to a new city can be a daunting experience and we often wish we had someone other than google to show us around. In
Guru Guides you've found a personal guide without the dizzying array of search results. Built to help you navigate the noise of a new city, Guru Guides has a search function that highlights relevant and adventurous suggestions for events and eats wherever you are in the world.

The journey planner page features a search function that populates the accompanied Google Map with events and 'eats' specific to that location. Using the 'add to planner' panel the user can then populate their journey plan with events and eats in the area.

__Features__
  * Login/Sign Up landing page
  * ORM/Interaction of SQL database to ensure users' profile, post and comments are stored and paired with the correct 'parent'     data.
  * Google Maps API integration
  * Google Maps Search
  * A list of events/'eats' in the area searched
  * User account page that includes a history of events/eats done and a diary

## User stories

Found on our [Trello board](https://trello.com/b/49zsJIbB/guru-guides).

## Technologies

* Front-end written in: **HTML5**, **CSS3**, **JavaScript**
* Back-end written in: **Ruby** **Rails** **Handlebars**
* Database: **PostgreSQL**
* APIs: **Google Maps** **Google Places**

## Wireframes
![landing page](http://i.imgur.com/7r6Yc4Q.png)
![planner page](http://i.imgur.com/UzRKRkJ.png)
![event/eats/add bar](http://i.imgur.com/zDOmxbp.png)
![locals chat](http://i.imgur.com/0Too4Eu.png)
![user account page](http://i.imgur.com/wYEQr7K.png)

## Approach

We created the wireframes as a team and then set out then spent time discussing how the user would interact with the page.

From there we assigned each other tasks for both front and back end and started to build the data-structure.

Using Trello cards we then wrote a sequential list of tasks that we each needed to perform, marked which ones where logic problems and which were DOM and began to code.

As the development process progressed we committed to git frequently to ensure that there were no conflicts.

The Front-end is built using a combination of HTML5, JavaScript/jQuery, the [Skeleton](http://getskeleton.com/) CSS3 framework, Handlebars and .erb templates from Rails.

The Back-end is built using Rails and PostgreSQL.

## To Do

* Editing/deleting plan

* let user edit/delete account

* Fix the styling

* More dry code


## Lessons learnt

* Commit frequently - a great way to avoid conflicts

* Test everything - byebugger is your best friend

* Mastering the Google Maps API

## Future Features

* Locals - a place for the user to talk directly with people from the area they are visiting.

* Zomato API - use the Zomato API to populate the eats section

* Restrict events to the location shown
