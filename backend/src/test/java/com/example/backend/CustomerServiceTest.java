//package com.example.backend;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//import com.example.backend.DTOs.CustomerDTO;
//import com.example.backend.models.Customer;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//
//@ExtendWith(MockitoExtension.class)
//public class CustomerServiceTest {

	//    private CustomerService customerService;
//    @Mock
//    private CustomerRepository customerRepository;
//    @Mock
//    private CustomerMapper customerMapper;
//
//    @BeforeEach
//    void setup(){
//        customerService = new CustomerService(customerRepository, customerMapper);
//    } 
//
//    @Test
//    void test_getCustomerByEmail_returnsCustomer(){
//        //arranged
//        String email = "testperson@email.com";
//        Customer expected = new Customer();
//        expected.setEmail(email);
//
//        //act
//        when(customerRepository.findByEmail(email))
//                .thenReturn(expected);
//        CustomerDTO actual = customerService.getCustomerByEmail(email);
//
//        //assert
//        verify(customerRepository, times(1))
//                .findByEmail(email);
//    }

//}
