CREATE DATABASE MyBlogAppDb
GO

USE MyBlogAppDb
GO

CREATE SCHEMA Blog
GO

-- Users Table
CREATE TABLE Blog.Users
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);


SELECT Id
      , FirstName
      , LastName
      , Email
      , PasswordHash
      , PasswordSalt
FROM Blog.Users
WHERE Email = ''

-- Posts Table
CREATE TABLE Blog.Posts
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Posts_Users FOREIGN KEY (UserId) REFERENCES Blog.Users(Id) ON DELETE CASCADE
);

-- Comments Table
CREATE TABLE Blog.Comments
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    PostId INT NOT NULL,
    UserId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Comments_Posts FOREIGN KEY (PostId) REFERENCES Blog.Posts(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_Users FOREIGN KEY (UserId) REFERENCES Blog.Users(Id)
);
GO

-- Addition on Comments Table
ALTER TABLE Blog.Comments 
ADD ParentId INT NULL;

ALTER TABLE Blog.Comments 
ADD CONSTRAINT FK_Comments_Comments 
FOREIGN KEY (ParentId) REFERENCES Blog.Comments(Id);