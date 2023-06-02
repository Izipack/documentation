---
title: create a return order
description: crete a label for pickup
---

## Create return order

Creating a return order through Izipack consists of three main API operations:
1. Creating a return order
2. Fetch the shipment label that should physically go onto the package for correct sending
3. Keeping track of the order status

### Create a return order

A return order is created using the shipment/retour call, the most important information here is the receiverAddress, and the package details (dimensions, weight, etc). This call returns the orderNumber that can then be used to fetch the label and status.

Note that in this case the sender is the consumer for whom the return order is, not the webshop.

The exact schema can be found in our [Swagger documentation](https://shipping-api.izipack.nl/index.html)

A sample request for package creation:
```bash
curl --location 'https://shipping-api.izipack.nl/shipment/retour' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'x-api-key: IZI-...sanitized..' \
--data-raw '{
    "sender": {
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
    "receiver": {
        "name": "Izipack",
        "emailAddress": "customersupport@izipack.nl",
        "address": {
            "street": "Dokter de Grootlaan",
            "housenumber": "3",
            "city": "Santpoort-Noord",
            "zipCode": "2071TG",
            "country": "NL"
        }
    },
    "pickUpDate": "2023-06-04",
    "description": "Webshop return - Internal ordernumber 345",
    "companyName": "webshop123.nl",
    "toAttentionOf": "afdeling RMA",
    "packages": [
        {
            "dimensions": {
                "height": "240",
                "width": "40",
                "depth": "40",
                "weight": "5000"
            },
            "description": "package 1"
        },
        {
            "dimensions": {
                "height": "241",
                "width": "41",
                "depth": "41",
                "weight": "5001"
            },
            "description": "package 2"
        }
    ]
}'
```
The response will include the orderNumber which can be used to get the order status and the label:
```json
{
    "orderNumber": "9RET326720205706",
    "packages": [
        {
            "labelCode": "7RET063502270276",
            "description": "package 1",
            "dimensions": {
                "height": 240,
                "width": 40,
                "depth": 40,
                "weight": 5000
            }
        },
        {
            "labelCode": "7RET350272270660",
            "description": "package 2",
            "dimensions": {
                "height": 241,
                "width": 41,
                "depth": 41,
                "weight": 5001
            }
        }
    ]
}
```

### Fetch shipment label

A PDF of the label that is to be attached to the package can be fetched via the shipment/:orderNumber/label call using the orderNumber returned during creation. An example request would be:

```bash
curl --location --request GET 'https://shipping-api.izipack.nl/shipment/{orderNumber}/label' \
--header 'x-api-key: IZI-...sanitized..'
```

The PDF that is returned contains a seperate page for each of the packages created in the order.

### Get order status

Polling the current status of a shipment can be done by fetching shipment/:orderNumber using the orderNumber returned during creation. A sample request would be:

```bash
curl --location --request GET 'https://shipping-api.izipack.nl/shipment/{orderNumber}' \
--header 'x-api-key: IZI-...sanitized..'
```
