@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div id="app"></div>
</div>

<script>
window.__INITIAL_STATE__ = {!! json_encode($initialState) !!}
</script>
@endsection