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

The exact schema can be found in our [Swagger documentation](https://shipping-api.izipack.nl/index.html)

A sample request for package creation:
```
curl --location --request POST 'https://shipping-api.izipack.nl/shipment' \
--header 'Content-Type: application/json' \
--header 'x-api-key: IZI-...sanitized..' \
--data-raw '{
    "sender": {
        "name": "Izipack",
        "address": {
            "street": "Dokter de Grootlaan",
            "housenumber": "3",
            "city": "Santpoort-Noord",
            "zipCode": "2071TG",
            "country": "NL"
        }
    },
    "receiver": {
        "name": "Sprookjeswonderland",
        "emailAddress": "info@izipack.nl",
        "phoneNumber": "0612345678",
        "address": {
            "country": "NL",
            "street": "Kooizandweg",
            "housenumber": "9",
            "zipcode": "1601 LK",
            "city": "Enkhuizen"
        }
    },
    "packages": [
        {
            "dimensions": {
                "width": 150,
                "height": 16,
                "depth": 40,
                "weight": 18500
            },
            "description": "package 1 of 2"
        },
        {
            "dimensions": {
                "height": 18,
                "width": 42,
                "depth": 26,
                "weight": 6134
            },
            "description": "package 2 of 2"
        }
    ]
}'
```

### Fetch shipment label

A PDF of the label that is to be attached to the package can be fetched via the Order/label call using the orderNumber returned during creation. An example request would be:

```
curl --location --request GET 'https://shipping-api.izipack.nl/shipment/{orderNumber}/label' \
--header 'x-api-key: IZI-...sanitized..'
```

### Get order status

Polling the current status of a shipment can be done by fetching Order/order using the orderNumber returned during creation. A sample request would be:

```
curl --location --request GET 'https://shipping-api.izipack.nl/shipment/{orderNumber}' \
--header 'x-api-key: IZI-...sanitized..'
```
which could return the following reponse
```
{
    "status": "Created",
    "deliveryDateUtc": "2023-01-24T13:08:25.482314",
    "description": null,
    "extraInstructions": null,
    "companyName": null,
    "toAttentionOf": null,
    "packages": [
        {
            "labelCode": "7IZP25F79D8C432A4F7490F4DA8704843CD4"
        },
        {
            "labelCode": "7IZP3C12767E8D1341889DE82988644EA04D"
        }
    ]
}
```