module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('product').find().toArray((err, result) => {
          if (err) return console.log(err)
          db.collection('order').find().toArray((err, orderDocs) => {
            if (err) return console.log(err)
            db.collection('payment').find().toArray((err, paymentDocs) => {
              if (err) return console.log(err)
       
        
          res.render('profile.ejs', {
            user : req.user,
            product: result,
            order: orderDocs,
            payment: paymentDocs
          })
        })
      })
    })
  });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/order', (req, res) => {
      console.log(req.body.name)
      console.log(req.body.price)
      db.collection('order').insertOne(
        {
        name: req.body.name,
        price: req.body.price
      },
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile');
      });
    })

    app.post('/save', (req, res) => {

      db.collection('payment').insertOne(
        {
        fullName: req.body.fullName,
        user: req.body.user,
        cardNumber: req.body.cardNumber, 
        phoneNumber: req.body.phoneNumber
      },
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile');
      });
    })


    

    app.put('/update', (req, res) => {
      console.log(req.body)
      db.collection('payment').findOneAndUpdate(
        {
          fullName: req.body.fullName,
          cardNumber: req.body.cardNumber, 
          phoneNumber: req.body.phoneNumber,
          user: req.body.user
        },

        {

        $set: {
          cardNumber: req.body.updatedCardNumber
        },
      }, 
      {
        sort: {_id: -1},
        upsert: true
      }, 
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
    )
  })

    app.delete('/deleteItem', (req, res) => {
      db.collection('order').findOneAndDelete({
        name: req.body.name,
        price: req.body.price
      }, (err, result) => {
        if (err) return res.send(500, err)
        console.log('deleted')
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
