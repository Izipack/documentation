---
title: Authentication
description: Generating and using API key
---

## Obtaining an API key

An API key will be provided once your account is setup. You can request an account by [contacting us](mailto:info@izipack.nl)

## Using API key

Once the API key is obtained it can be used to create shipments by passing it in the x-api-key header

A sample request for package creation that includes the x-api-key header:
```bash
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
