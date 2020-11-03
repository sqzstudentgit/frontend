import React, { Children } from 'react';
import ReactDOM from 'react-dom'
import { render, screen,fireEvent, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import 'babel-polyfill';
import store from '../../src/store';
import { StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom'


import ProductDetailsPage from '../../src/pages/ProductDetailsPage'

jest.mock('axios')



describe('ProductDetailsPage', () => {

    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }))
        });
      });

    const data = {
      IsHolyOakes: true,
      averageCost: null,
      barcode: null,
      barcodeInner: null,
      brand: null,
      categoryList: null,
      depth: 0,
      description1: "The Holyoake CFP range of square and round face Radial Induction Swirl  The CFP is available in a variety of sizes in both square & circular face plates.",
      description2: "Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP. Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) ",
      description3: null,
      description4: null,
      drop: null,
      height: 0,
      id: 3430,
      internalID: null,
      isKitted: null,
      isPriceTaxInclusive: null,
      keyProductID: "CFP-600-12-LPP-250",
      keySellUnitID: null,
      keyTaxcodeID: "34333235303332303734313231",
      kitProductsSetPrice: null,
      name: null,
      packQuantity: null,
      price: 99.98,
      priceList: null,
      productCode: "CFP-600-12-LPP-250",
      productCondition: null,
      productName: "CFP - 600/12 Swirl Diffusers with Low Profile Plenum 250 Spigot",
      productSearchCode: null,
      quantity: 1,
      sellUnits: null,
      sellUnitsIdList: null,
      stockLowQuantity: 0,
      stockQuantity: 77,
    }
    const imagesOnly = [
        {
            fileName: "",
            id: 3622,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            threeDModelLocation: ""
        }
        ,
        {
            fileName: "",
            id: 3623,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            threeDModelLocation: ""
        }
        ,
        {
            fileName: "",
            id: 3624,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            threeDModelLocation: ""
        }
    ];

    /*
    it("Runs without crashing",()=>{

        const hist = [];
        const {getByText} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:'CFP-600-12-LPP-250'}}} props={{history: hist}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        )

    });
    */

    it("Check if correct Product is Loaded",async ()=>{

        data.imageList = imagesOnly;
        const nodata = null

        const _productCode = "CFP-600-12-LPP-250";

        sessionStorage.setItem('user','user')


        const {getByText} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:_productCode}, dummyData:{data}}} props={{history: []}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        );


       const productName =  " CFP - 600/12 Swirl Diffusers with Low Profile Plenum 250 Spigot"
       
       /*     
       await waitFor(() => {
        expect(mockAxios).toHaveBeenCalledTimes(1)
       })

       expect(mockAxios).toHaveBeenCalledWith({
            method: 'post',           
            url: 'api/product',
            headers: { 'Content-Type': 'application/JSON; charset=UTF-8' },
            data:{
                "productCode": _productCode,
            }
                
        })*/


       await waitFor(() => {
       //     expect(screen.getByText(productName).value).toBe(productName);
            expect(screen.getByTestId("title").textContent).toBe(productName);
       });


    });

    /*
    it('should render three elements', () => {
        render(<LoginForm />)
        expect(screen.getAllByPlaceholderText('Password').length).toBe(1);  
        expect(screen.getAllByPlaceholderText('Username').length).toBe(1);   
        expect(screen.getAllByText('Log in').length).toBe(1);
    })
    */

    /*
    it('Change display value when user input', () => {
        render(<LoginForm />)
        const username = 'me';
        const password = 'please';
        expect(screen.getByPlaceholderText('Username').value).toBe('')
        expect(screen.getByPlaceholderText('Password').value).toBe('')
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } })
        expect(screen.getByPlaceholderText('Username').value).toBe(username)
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } })
        expect(screen.getByPlaceholderText('Password').value).toBe(password)
        screen.getByPlaceholderText('Password')
    })
    
    it('should handle submit by sending axios request', async () => {
        render(<LoginForm />)
        
        const username = 'me';
        const password = 'please';
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } })
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } })


        await fireEvent.submit(screen.getByText('Log in'))

        // Press enter on the password field
        //await fireEvent.keyDown(screen.getByPlaceholderText('Password'),{ key: 'Enter', code: 'Enter' })
        await waitFor(() => {
         expect(mockAxios).toHaveBeenCalledTimes(1)
        })

        expect(mockAxios).toHaveBeenCalledWith({
                method: 'post',           
                url: 'api/login',
                headers: {'Content-Type': 'application/JSON; charset=UTF-8'},
                data:{
                    "username": username,
                    "password": password,
                }
                    
                })
    })
    */
    

});