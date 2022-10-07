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

### Fetch shipment label

A PDF of the label that is to be attached to the package can be fetched via the Order/label call using the orderNumber returned during creation

### Get order status

Polling the current status of a shipment can be done by fetching Order/order using the orderNumber returned during creation

