---
title: Authentication
description: Generating and using API key
---

## Obtaining an API key

An API key will be provided once your account is setup. You can request an account by [contacting us](mailto:info@izipack.nl)

## Using API key

Once the API key is obtained it can be used to create shipments by passing it in the x-api-key header

A sample request for package creation that includes the x-api-key header:
```
curl --location --request POST 'https://shipping-api.izipack.nl/api/Order/create' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: IZI-...sanitized..' \
--data-raw '{
  "ReceiverAddress":  {
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
      "Description": "Create Package sample"
    }
  ],
  "deliveryDate":"2022-12-09T12:00:00.00Z"
}'
```
