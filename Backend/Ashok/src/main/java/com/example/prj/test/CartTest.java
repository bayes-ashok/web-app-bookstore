//package com.example.prj.test;
//
//
//import com.example.prj.entity.Cart;
//import com.example.prj.pojo.CartPojo;
//import com.example.prj.repository.CartRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.mockito.Mockito.*;
//
//class CartTest {
//
//    @Mock
//    private CartRepository cartRepository;
//
//    @InjectMocks
//    private CartServiceImpl cartService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    void saveCart() {
//        CartPojo cartPojo = new CartPojo();
//        cartPojo.setId(1);
//        cartPojo.setItemId(1);
//        cartPojo.setUserId(1);
//        cartPojo.setItemQuantity(2);
//
//        when(cartRepository.findById(1)).thenReturn(Optional.of(new Cart()));
//
//        cartService.saveCart(cartPojo);
//
//        verify(cartRepository, times(1)).save(any(Cart.class));
//    }
//
//    @Test
//    void findAll() {
//        when(cartRepository.findAll()).thenReturn(Arrays.asList(new Cart(), new Cart()));
//
//        List<Cart> result = cartService.findAll();
//
//        verify(cartRepository, times(1)).findAll();
//        assertThat(result).isNotEmpty();
//        assertThat(result.size()).isEqualTo(2);
//    }
//
//    @Test
//    void findByUserId() {
//        Integer userId = 1;
//        when(cartRepository.findByUserId(userId)).thenReturn(Arrays.asList(new Cart(), new Cart()));
//
//        List<Cart> result = cartService.findByUserId(userId);
//
//        verify(cartRepository, times(1)).findByUserId(userId);
//        assertThat(result).isNotEmpty();
//        assertThat(result.size()).isEqualTo(2);
//    }
//
//    @Test
//    void findById() {
//        Integer id = 1;
//        Cart cart = new Cart();
//        when(cartRepository.findById(id)).thenReturn(Optional.of(cart));
//
//        Optional<Cart> result = cartService.findById(id);
//
//        verify(cartRepository, times(1)).findById(id);
//        assertThat(result).isNotEmpty();
//        assertThat(result.get()).isEqualTo(cart);
//    }
//
//    @Test
//    void deleteById() {
//        Integer id = 1;
//        cartService.deleteById(id);
//        verify(cartRepository, times(1)).deleteById(id);
//    }
//}
