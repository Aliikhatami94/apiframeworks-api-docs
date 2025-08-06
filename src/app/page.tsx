'use client';

import React from 'react';
import {ApiFrameworksDoc} from "@/components/ApiFrameworksDoc";
import yaml from 'js-yaml';

const hardcodedSpec = `
openapi: 3.0.0
info:
  title: Sample Full API
  version: 1.0.0
  description: ""
  contact:
    name: ""
    email: ""
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production server

tags:
  - name: users
    description: Operations about users
  - name: products
    description: Product catalog endpoints
  - name: orders
    description: Order management

paths:
  /users:
    get:
      summary: List all users
      description: ""
      tags:
        - users
      operationId: listUsers
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
  /users/{userId}:
    get:
      summary: Get a user
      operationId: getUser
      tags:
        - users
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: Not found
    delete:
      summary: Delete a user
      operationId: deleteUser
      tags:
        - users
      responses:
        '204':
          description: User deleted

  /products:
    post:
      summary: Add a new product
      operationId: addProduct
      tags:
        - products
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Product'
      responses:
        '201':
          description: Product created

  /orders:
    get:
      summary: Get all orders
      operationId: getOrders
      tags:
        - orders
      responses:
        '200':
          description: List of orders
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Order'

    post:
      summary: Create an order
      operationId: createOrder
      tags:
        - orders
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrder'
      responses:
        '201':
          description: Order created
      callbacks:
        onOrderCreated:
          '{$request.body#/callbackUrl}':
            post:
              summary: Callback after order creation
              requestBody:
                required: true
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        orderId:
                          type: string
              responses:
                '200':
                  description: Acknowledged

components:
  schemas:
    User:
      type: object
      required:
        - id
        - name
        - email
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
        role:
          type: string
          enum: [admin, user, guest]

    Product:
      type: object
      required: [id, name, price]
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        price:
          type: number
          format: float

    Order:
      type: object
      required: [id, userId, items]
      properties:
        id:
          type: string
        userId:
          type: string
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'

    OrderItem:
      type: object
      required: [productId, quantity]
      properties:
        productId:
          type: string
        quantity:
          type: integer

    NewOrder:
      allOf:
        - $ref: '#/components/schemas/Order'
        - type: object
          properties:
            callbackUrl:
              type: string
              format: uri

security:
  - api_key: []

securitySchemes:
  api_key:
    type: apiKey
    in: header
    name: X-API-Key
`

export default function Home() {
    let spec = null;
    try {
        spec = hardcodedSpec.trim().startsWith('{') ? JSON.parse(hardcodedSpec) : yaml.load(hardcodedSpec);
    } catch (e) {
        return <div className="text-red-500">Invalid OpenAPI/Swagger spec: {(e as Error).message}</div>;
    }
    return <ApiFrameworksDoc spec={spec} isExpanded={true} />
}