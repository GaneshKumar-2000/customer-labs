# customer-labs
This is an assessment for node js developer
Node js version used - 21.0.0

This project consists of 
1. Account CRED operation with generating unique token for every account.
2. Destination CRED operation with accounts linked to these destinations. (you can only create a destination with the account app_secret_token)
3. An account can have multiple destinations.
4. An endpoint to fetch all the destinations with the account app_secret_token. (destinations linked to the account id)
5. An endpoint to send the data which is given in the body of the request /service/incoming_data, where the given data is sent to all the destinations according to their http methods. A request is created and data is sent according to the http method given in the destination and the destination headers.