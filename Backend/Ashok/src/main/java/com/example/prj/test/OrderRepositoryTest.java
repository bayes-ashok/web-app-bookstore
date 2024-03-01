//package com.example.prj.test;
//
//import com.example.prj.entity.Cart;
//import com.example.prj.entity.Order;
//import com.example.prj.entity.User;
//import com.example.prj.pojo.OrderPojo;
//import com.example.prj.repository.CartRepository;
//import com.example.prj.repository.OrderRepository;
//import com.example.prj.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.*;
//
//class OrderRespositoryTest {
//
//    @Mock
//    private OrderRepository orderRepository;
//
//    @Mock
//    private CartRepository cartRepository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private OrderServiceImpl orderService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.initMocks(this);
//    }
//
//    @Test
//    void saveItem() {
//        OrderPojo orderPojo = new OrderPojo();
//        orderPojo.setId(1);
//        orderPojo.setCartId(1);
//        orderPojo.setUserId(1);
//        orderPojo.setAddress("Test Address");
//        orderPojo.setPhone_no(1234567890);
//
//        Cart cart = new Cart();
//        cart.setId(1);
//        User user = new User();
//        user.setId(1);
//
//        when(orderRepository.findById(1)).thenReturn(Optional.of(new Order()));
//        when(cartRepository.findById(1)).thenReturn(Optional.of(cart));
//        when(userRepository.findById(1)).thenReturn(Optional.of(user));
//
//        orderService.saveItem(orderPojo);
//
//        verify(orderRepository, times(1)).save(any(Order.class));
//    }
//
//    @Test
//    void findAll() {
//        orderService.findAll();
//        verify(orderRepository, times(1)).findAll();
//    }
//
//    @Test
//    void findById() {
//        Integer id = 1;
//        Order order = new Order();
//
//        when(orderRepository.findById(id)).thenReturn(Optional.of(order));
//
//        Optional<Order> result = orderService.findById(id);
//
//        verify(orderRepository, times(1)).findById(id);
//        assertThat(result).isNotEmpty();
//        assertThat(result.get()).isEqualTo(order);
//    }
//
//    @Test
//    void deleteById() {
//        Integer id = 1;
//        orderService.deleteById(id);
//        verify(orderRepository, times(1)).deleteById(id);
//    }
//}
//
//
