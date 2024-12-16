---
title: UX Meets Database Design, a Match Made in Heaven
slug: ux-meets-database-design-a-match-made-in-heaven
date: Sun Feb 12 2023
categories:
  - software-development
  - project-management
  - ux
  - sql
  - ux-design
---

#### Putting UX at the heart of user-centric SQL schema data modeling

![](https://cdn-images-1.medium.com/max/1024/1*58bBEYQwF1NjIFj2A_l02w.png)

User experience (UX) is a crucial aspect of software development that directly impacts the success of a software project. From my experience working across teams at Google, TD Bank, as well as many at startups I've learnt that UX is not just about how the software looks. It's about how it functions to meets the needs of the end user.

When designing a database, UX needs to be considered in order to ensure the database meets the users' needs. This begins with understanding the users' workflow and nailing down a flexible data model. If the data is normalized and structured well, complex UIs can be implemented much easier and unknown future features will come naturally.

There are several reasons why UX should be taken into account when data modeling and creating an SQL schema. Here's a few that stick out to me:

#### Better Data Structure

Taking UX into account when designing a database can help ensure that the data structure is intuitive and makes sense to the end users. This can be achieved by using proper [normalization techniques](https://www.w3schools.in/dbms/database-normalization), creating appropriate [relationships between tables](https://www.w3schools.in/dbms/er-model), and using descriptive and meaningful column names.

#### Improved Data Quality

When UX is considered during database design, it's more likely that the data entered into the database will be of high quality. This is because the users will have a clear understanding of what data is expected and how it should be entered. Consider guard rails like consistent date formatting, avoiding unstructured text, and keeping terminology consistent between the UI, Backend and Database.

#### Easier Maintenance

A well designed database that takes UX into account will be easier to maintain over time. The data structures and overall system will be easier for developers to understand the relationships between the tables, and it will be easier for end-users to enter data accurately.

![](https://cdn-images-1.medium.com/max/1024/1*SGDu3CsCIAZcg_Z-Mc767A.png)

Example of UX applied to an Employee Table

A good example is a database for an employee's information. You could have an employee's job title as a text field in the database but this could allow for spelling mistakes or duplicate data entry. Better UX would be to describe a roles in the company as a separate table and link to it. This would result in a cleaner way to store other information about the job like a title, description, reference to a pay band, etc.

Many different spellings of something like Engineering Manager can occur and ruin your data integrity. A simple search turns into variation whack-a-mole. future features may be unapproachable as time goes on and more variations occur.

With this job table example, if an admin needs to update info for a specific job it can be applied across the company easily. If someone wants to see how many of a job are in their department to run a report this info can be looked up quickly and with confidence that the info is correct.

#### Better User Adoption

When a database is designed with UX in mind, it is more likely to be adopted by the end users. You're not just modeling the data they're storing but also reflecting their behavior. When people have a positive experience working with your app, they will be more likely to continue using it.

#### Using UX to Drive Data Relationships

In database design, the choice between using a through table or a foreign key to represent a many-to-many relationship between two entities can have an impact on the user experience.

A foreign key points to a single point of related data where as a through table can represent a list of relationships. Many times a foreign key is enough for straight forward data relationships. However, migrating the database schema to through table structure down the road can have a time consuming migration and complicate a feature release.

Let's consider a simple example of a news website where articles can be written by multiple authors and authors can have multiple articles on their profile.

![](https://cdn-images-1.medium.com/max/1024/1*JzGq47WDdiYU8rH3kE3P-g.png)

An example of two different data models for a news article content management system.

If the design uses a foreign key, the database might have two tables, one for books and one for authors, with a many-to-many relationship established by adding a column to the books table that contains an array of author IDs. This design is easy to implement but can be limited in terms of UX. For example, it may not be possible to query the database for all the books written by a specific author or for all the authors of a specific book.

On the other hand, if the design uses a through table, a third table is created that contains the relationships between articles and authors. This table will have two columns, one for the book ID and one for the author ID. This design allows for more complex queries and provides a better UX.

With this extra table representing these relationships it would be possible to quickly query the database for all the articles written by a specific author or for all the authors of a specific article. The through table also provides more flexibility for future changes to the data structure, such as adding additional information about the relationship between an article. Information about how the authors contributed to the article can be included like they are the primary author, editor, photographer, etc. without having extra fields laying around.

In this case, UX informed the decision to use a through table instead of a foreign key to represent the many-to-many relationship between articles and authors. The through table approach allows the database to provide richer information through the application and more complex queries, thus providing more flexibility for future changes.

In summary, taking UX into account when designing a database can lead to a better data structure, improved data quality, easier maintenance, and better user adoption. All of these factors can ultimately contribute to the success of a project.

_More content at_ [**_PlainEnglish.io_**](https://plainenglish.io/)_. Sign up for our_ [**_free weekly newsletter_**](http://newsletter.plainenglish.io/)_. Follow us on_ [**_Twitter_**](https://twitter.com/inPlainEngHQ), [**_LinkedIn_**](https://www.linkedin.com/company/inplainenglish/)_,_ [**_YouTube_**](https://www.youtube.com/channel/UCtipWUghju290NWcn8jhyAw)_, and_ [**_Discord_**](https://discord.gg/GtDtUAvyhW)**_._**

**_Interested in scaling your software startup_**_? Check out_ [**_Circuit_**](https://circuit.ooo?utm=publication-post-cta)_._

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=192e66729f21)

- - -

[UX Meets Database Design, a Match Made in Heaven](https://javascript.plainenglish.io/ux-meets-database-design-a-match-made-in-heaven-192e66729f21) was originally published in [JavaScript in Plain English](https://javascript.plainenglish.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.
