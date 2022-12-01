---
title: Package sending
description: Get started with sending your first package.
---

## Setup package sending

Sending a package through Izipack consists of three main API operations:
1. Creating a shipping order
2. Fetch the shipment label that should physically go onto the package for correct sending
3. Keeping track of the order status

### Create a shipping order

An order is created using the Order/create call, the most important information here is the receiverAddress, and the package details (dimensions, weight, etc). This call returns the orderNumber that can then be used to fetch the label and status.

The exact schema can be found here: https://shipping-api.izipack.nl/index.html 

A sample request for a package:
```
{
  "ReceiverAddress": {
    "Name": "Sprookjeswonderland",
    "Country": "NL",
    "Street": "Kooizandweg",
    "Housenumber": "9",
    "Zipcode": "1601 LK",
    "City": "Enkhuizen",
    "EmailAddress": "info@izipack.nl",
    "Phone": "0612345678"
  },
  "Packages": [
    {
      "Dimensions": {
        "Width": 150,
        "Height": 16,
        "Depth": 40,
        "Weight": 18500
      },
      "Description": "test package izipack"
    }
  ],
  "ExtraInstructions": "Please bring cake"
}
```

### Fetch shipment label

A PDF of the label that is to be attached to the package can be fetched via the Order/label call using the orderNumber returned during creation. An example request would be:

```
curl --location --request GET 'https://shipping-api.izipack.nl/api/Order/label?orderNumber=9IZP576912483' \
--header 'Authorization: [APIKEYHere]'
```

### Get order status

Polling the current status of a shipment can be done by fetching Order/order using the orderNumber returned during creation. A sample request would be:

```
curl --location --request GET 'https://shipping-api.izipack.nl/api/Order/status?orderNumber=9IZP576912483' \
--header 'Authorization: [APIKEYHere]'
```
which could return the following reponse
```
{
    "status": "Created",
    "orderNumber": "9IZP576912483",
    "createdAt": "2022-12-01T14:56:59",
    "updatedAt": "2022-12-01T14:56:59"
}
```