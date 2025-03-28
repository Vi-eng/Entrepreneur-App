USE [master]
GO
/****** Object:  Database [Entre]    Script Date: 8/31/2023 4:20:16 PM ******/
CREATE DATABASE [Entre]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Entre', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Entre.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Entre_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Entre_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Entre] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Entre].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Entre] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Entre] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Entre] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Entre] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Entre] SET ARITHABORT OFF 
GO
ALTER DATABASE [Entre] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Entre] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Entre] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Entre] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Entre] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Entre] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Entre] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Entre] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Entre] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Entre] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Entre] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Entre] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Entre] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Entre] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Entre] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Entre] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Entre] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Entre] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Entre] SET  MULTI_USER 
GO
ALTER DATABASE [Entre] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Entre] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Entre] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Entre] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Entre] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Entre] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Entre] SET QUERY_STORE = ON
GO
ALTER DATABASE [Entre] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Entre]
GO
/****** Object:  User [Entadmin]    Script Date: 8/31/2023 4:20:19 PM ******/
CREATE USER [Entadmin] FOR LOGIN [Entadmin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Entadmin]
GO
/****** Object:  Table [dbo].[Applyfunds]    Script Date: 8/31/2023 4:20:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Applyfunds](
	[BusinessName] [varchar](50) NOT NULL,
	[BusinessRegno] [varchar](50) NOT NULL,
	[BusinessSector] [varchar](50) NOT NULL,
	[BusinessIdeaDes] [text] NOT NULL,
	[BusinessEmail] [varchar](50) NOT NULL,
	[RequestedFunds] [varchar](50) NOT NULL,
	[BusinessTerms] [varchar](50) NOT NULL,
	[Approved] [varchar](50) NULL,
	[Deleted] [varchar](50) NULL,
	[InvestorID] [int] NULL,
	[EntreID] [int] NULL,
	[fundid] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK__Applyfun__33602225348B7A71] PRIMARY KEY CLUSTERED 
(
	[fundid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Applyloan]    Script Date: 8/31/2023 4:20:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Applyloan](
	[BusinessName] [varchar](50) NULL,
	[BusinessRegno] [varchar](50) NULL,
	[BusinessSector] [varchar](50) NULL,
	[BusinessIdeaDes] [text] NULL,
	[BusinessEmail] [varchar](50) NULL,
	[RequestedFunds] [varchar](50) NULL,
	[BusinessTerms] [varchar](50) NULL,
	[Approved] [varchar](50) NULL,
	[Deleted] [varchar](50) NULL,
	[EntreID] [int] NULL,
	[fundid] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Applyloan] PRIMARY KEY CLUSTERED 
(
	[fundid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApplyMentor]    Script Date: 8/31/2023 4:20:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplyMentor](
	[BusinessName] [varchar](50) NOT NULL,
	[BusinessSector] [varchar](50) NOT NULL,
	[AppliedBefore] [varchar](50) NOT NULL,
	[MGender] [varchar](50) NOT NULL,
	[MentorID] [varchar](50) NULL,
	[EntreID] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 8/31/2023 4:20:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](255) NOT NULL,
	[Useremail] [varchar](255) NOT NULL,
	[Passwords] [varchar](255) NOT NULL,
	[Ids] [varchar](255) NOT NULL,
	[Businessname] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Applyfunds] ON 

INSERT [dbo].[Applyfunds] ([BusinessName], [BusinessRegno], [BusinessSector], [BusinessIdeaDes], [BusinessEmail], [RequestedFunds], [BusinessTerms], [Approved], [Deleted], [InvestorID], [EntreID], [fundid]) VALUES (N'Blazers', N'1', N'Engineering', N'Device which turns Bio-degradables into Electricity', N'blazers@gmail.com', N'1000000', N'5% of Company shares to the investor, 2 years wait', N'C', NULL, 1, 3, 1)
INSERT [dbo].[Applyfunds] ([BusinessName], [BusinessRegno], [BusinessSector], [BusinessIdeaDes], [BusinessEmail], [RequestedFunds], [BusinessTerms], [Approved], [Deleted], [InvestorID], [EntreID], [fundid]) VALUES (N'Agrow', N'0', N'Agriculture ', N'Farming ten acres of land for crops.', N'mario@gmail.com', N'2', N'5% of Company shares to the investor, 2 years wait', N'C', NULL, 1, 3, 3)
SET IDENTITY_INSERT [dbo].[Applyfunds] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [Username], [Useremail], [Passwords], [Ids], [Businessname]) VALUES (1, N'Mario', N'mario@gmail.com', N'P@ssw0rd', N'I', N'')
INSERT [dbo].[Users] ([UserID], [Username], [Useremail], [Passwords], [Ids], [Businessname]) VALUES (2, N'Mario', N'mario@gmail.com', N'P@ssw0rd', N'I', N'')
INSERT [dbo].[Users] ([UserID], [Username], [Useremail], [Passwords], [Ids], [Businessname]) VALUES (3, N'Mario', N'mario@gmail.com', N'P@ssw0rd', N'E', N'Razors')
INSERT [dbo].[Users] ([UserID], [Username], [Useremail], [Passwords], [Ids], [Businessname]) VALUES (5, N'Admin', N'admin@lapo.ng', N'Adm!n123', N'A', NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
/****** Object:  StoredProcedure [dbo].[cancelDelete]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[cancelDelete]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@id int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM dbo.Applyfunds WHERE fundid = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[cancelRequest]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[cancelRequest]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@id INT, @investid INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Applyfunds
	SET InvestorID = @investid, Approved = 'C'
	WHERE fundid = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[checkEmail]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[checkEmail]
@email varchar(255), @login_id varchar(255)
--<Procedure_Name, sysname, ProcedureName> 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
   -- SELECT * 
	--FROM dbo.Users 
	--WHERE Username = @username AND Passwords = @password AND Ids = 'A';

	SELECT * 
	FROM dbo.Users 
	WHERE Useremail = @email AND Ids = @login_id;

END
GO
/****** Object:  StoredProcedure [dbo].[checkNameEmail]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[checkNameEmail]
@username varchar(255), @login_id varchar(255)
--<Procedure_Name, sysname, ProcedureName> 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
   -- SELECT * 
	--FROM dbo.Users 
	--WHERE Username = @username AND Passwords = @password AND Ids = 'A';

	SELECT * 
	FROM dbo.Users 
	WHERE (Username = @username OR Useremail = @username) AND Ids = @login_id;

END
GO
/****** Object:  StoredProcedure [dbo].[createAdmin]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createAdmin]
	-- Add the parameters for the stored procedure here
	@username varchar(255), @password varchar(255)
	
AS
BEGIN
	
    -- Insert statements for procedure here
	SELECT * FROM dbo.Users WHERE Username = @username AND Passwords = @password
END
GO
/****** Object:  StoredProcedure [dbo].[enterApplication]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[enterApplication]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	
  @business varchar(50), @busregno varchar, @bussector varchar(50), @BusideaDes text, @busemail varchar(50), @busfunds varchar, 
  @busterms varchar(50),  @entid int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Applyfunds(BusinessName, BusinessRegno, BusinessSector, BusinessIdeaDes, BusinessEmail, RequestedFunds, BusinessTerms, EntreID)
	VALUES(@business, @busregno, @bussector, @BusideaDes , @busemail , @busfunds, @busterms, @entid);
END
GO
/****** Object:  StoredProcedure [dbo].[enterLoan]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[enterLoan]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	
  @business varchar(50), @busregno varchar, @bussector varchar(50), @BusideaDes text, @busemail varchar(50), @busfunds varchar, 
  @busterms varchar(50),  @entid int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Applyloan(BusinessName, BusinessRegno, BusinessSector, BusinessIdeaDes, BusinessEmail, RequestedFunds, BusinessTerms, EntreID)
	VALUES(@business, @busregno, @bussector, @BusideaDes , @busemail , @busfunds, @busterms, @entid);
END
GO
/****** Object:  StoredProcedure [dbo].[enterNewUser]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[enterNewUser]
@username varchar(255), @useremail varchar(255), @password varchar(255), @login_id varchar(255), @business_name varchar(255)
--<Procedure_Name, sysname, ProcedureName> 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
   -- SELECT * 
	--FROM dbo.Users 
	--WHERE Username = @username AND Passwords = @password AND Ids = 'A';

	INSERT INTO dbo.Users (Username, Useremail, Passwords, Ids, Businessname)
	VALUES (@username, @useremail, @password, @login_id, @business_name);

END
GO
/****** Object:  StoredProcedure [dbo].[fundRequest]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[fundRequest]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	@id INT, @investid INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Applyfunds
	SET InvestorID = @investid, Approved = 'A'
	WHERE fundid = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[getAdmin]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAdmin]
@username varchar(255), @password varchar(255)
--<Procedure_Name, sysname, ProcedureName> 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
    SELECT * 
	FROM dbo.Users 
	WHERE Username = @username AND Passwords = @password AND Ids = 'A';

END
GO
/****** Object:  StoredProcedure [dbo].[selectApplication]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[selectApplication]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	
	@id varchar(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM dbo.Applyfunds
	WHERE EntreID = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[selectApplications]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[selectApplications]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM dbo.Applyfunds
END
GO
/****** Object:  StoredProcedure [dbo].[selectloans]    Script Date: 8/31/2023 4:20:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[selectloans]
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM dbo.Applyloan;
END
GO
USE [master]
GO
ALTER DATABASE [Entre] SET  READ_WRITE 
GO
