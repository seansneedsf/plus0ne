const email2host=`
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required styles for MDC Web -->
	<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
	<!-- Required MDC Web JavaScript library -->
	<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
	<!-- Instantiate single textfield component rendered in the document -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Plus0ne</title>
	<style>
		.email-body{
			margin: 0;
			display: flex;
			flex-direction: column;
			font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
			height: 700px;
		}
		.logo{
			height: 44px;
		}
		.mdc-top-app-bar{
			background: #ffffff;
		}
		.preview-image-container{
			width: 100%;
			height: 186px;
			margin-top: 56px;
		}
		.preview-image{
			width: 100%;
			height: 100%;
		}
		.mdc-card{
			height: 100%;
			margin: 12px;
		}
		.content-body{
			height: 100vh;
			max-width: 550px;
			min-width: 360px;
			margin: auto;
			margin-top: 24px;
			margin-bottom: 24px;
			position: relative;
		}
		.date-time-container{
			display: flex;
		}
		.event-date-time{
			width: calc(50% - 2px);
		}
		.event-detail{
			padding: 12px;
			font-size: 18px;
			text-align: center;
			font-weight: 500;
		}
		.event-date-time{
			background-color: #555555;
			color: #ffffff;
		}
		.event-date{
			margin-right: 0;
		}
		.even-time{
			margin-left: 0;
		}
		.event-address{
			background-color: #EE4444;
			color: #ffffff;
			margin-top: 0px;
		}
		.event-name{
			font-size: 46px;
			font-weight: 500;
			margin: 0 12px 0 12px;
		}
		.mdc-top-app-bar{
			position: absolute!important;
		}
		.mdc-top-app-bar__title{
			color: black;
			font-size: 34px;
		}
		.host-manage-button-container{
			width: calc(100% - 24px);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			margin-top: 68px;
			padding: 0px 12px 0 12px;
		}
		.date-time-address-container{
			margin-top: 12px;
		}
	</style>
</head>
<body class="email-body">
	<div class="content-body mdc-card">
			<div class="mdc-top-app-bar">
				<div class="mdc-top-app-bar__row">
					<div class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<span class="mdc-top-app-bar__navigation-icon">
							<img src="./medias/plus0ne_logo_light.png" class="logo"/>
						</span>
						<span class="mdc-top-app-bar__title">Plus0ne</span>
					</div>
				</div>
			</div>
			<div class="preview-image-container">
				<div class="mdc-card">
					<img src="https://source.unsplash.com/335x180/?nature" class="preview-image"/>
				</div>
			</div>
			<div class="date-time-address-container">
				<div class="date-time-container">
					<div class="mdc-card event-date-time event-date event-detail">
						%DATE%
					</div>
					<div class="mdc-card event-date-time event-time event-detail">
						%TIME%
					</div>
				</div>
				<div class="address-container">
					<div class="mdc-card event-address event-detail">
						%ADDRESS%
					</div>
				</div>
				<div class="event-name">
					%NAME%
				</div>
				<div class="host-manage-button-container">
					<span>Event Link:</span>
					<a href="%URL%">%URL%</a>
				</div>
			</div>
		</div>
</body>
</html>
`;
const email2guest=`
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required styles for MDC Web -->
	<link rel="stylesheet" href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css">
	<!-- Required MDC Web JavaScript library -->
	<script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
	<!-- Instantiate single textfield component rendered in the document -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Plus0ne</title>
	<style>
		.email-body{
			margin: 0;
			display: flex;
			flex-direction: column;
			font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
			height: 700px;
		}
		.logo{
			height: 44px;
		}
		.mdc-top-app-bar{
			background: #ffffff;
		}
		.preview-image-container{
			width: 100%;
			height: 186px;
			margin-top: 56px;
		}
		.preview-image{
			width: 100%;
			height: 100%;
		}
		.mdc-card{
			height: 100%;
			margin: 12px;
		}
		.content-body{
			height: 100vh;
			max-width: 550px;
			min-width: 360px;
			margin: auto;
			margin-top: 24px;
			margin-bottom: 24px;
			position: relative;
		}
		.date-time-container{
			display: flex;
		}
		.event-date-time{
			width: calc(50% - 2px);
		}
		.event-detail{
			padding: 12px;
			font-size: 18px;
			text-align: center;
			font-weight: 500;
		}
		.event-date-time{
			background-color: #555555;
			color: #ffffff;
		}
		.event-date{
			margin-right: 0;
		}
		.even-time{
			margin-left: 0;
		}
		.event-address{
			background-color: #EE4444;
			color: #ffffff;
			margin-top: 0px;
		}
		.event-name{
			font-size: 46px;
			font-weight: 500;
			margin: 0 12px 0 12px;
		}
		.mdc-top-app-bar{
			position: absolute!important;
		}
		.mdc-top-app-bar__title{
			color: black;
			font-size: 34px;
		}
		.guest-response-button-container{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			margin-top: 68px;
		}
		.guest-response-button{
			margin: 0 6px 0 6px;
		}
		.guest-accept{
			background-color: limegreen !important;
		}
		.guest-decline{
			background-color: red !important;
		}
		.manage-event-button{
			background: white!important;
			color: #000000!important;
			font-size: 16px;
			font-weight: 500;
			min-height: 52px;
		}
		.date-time-address-container{
			margin-top: 12px;
		}
	</style>
</head>
<body class="email-body">
	<div class="content-body mdc-card">
			<div class="mdc-top-app-bar">
				<div class="mdc-top-app-bar__row">
					<div class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<span class="mdc-top-app-bar__navigation-icon">
							<img src="./medias/plus0ne_logo_light.png" class="logo"/>
						</span>
						<span class="mdc-top-app-bar__title">Plus0ne</span>
					</div>
				</div>
			</div>
			<div class="preview-image-container">
				<div class="mdc-card">
					<img src="https://source.unsplash.com/335x180/?nature" class="preview-image"/>
				</div>
			</div>
			<div class="date-time-address-container">
				<div class="date-time-container">
					<div class="mdc-card event-date-time event-date event-detail">
						%DATE%
					</div>
					<div class="mdc-card event-date-time event-time event-detail">
						%TIME%
					</div>
				</div>
				<div class="address-container">
					<div class="mdc-card event-address event-detail">
						%ADDRESS%
					</div>
				</div>
				<div class="event-name">
					%NAME%
				</div>
				<div class="guest-response-button-container">
					<div class="mdc-card">
						<a class="mdc-button mdc-button--raised guest-response-button guest-accept"
							href="http://%ACCEPT_URL%">
							<span class="mdc-button__label">Accept</span>
						</a>
					</div>
					<div class="mdc-card">
						<a class="mdc-button mdc-button--raised guest-response-button guest-decline"
							href="http://%DECLINE_URL%">
							<span class="mdc-button__label">Decline</span>
						</a>
					</div>
				</div>
			</div>
		</div>
</body>
</html>
`;

module.exports.email2host = email2host;
module.exports.email2guest = email2guest;